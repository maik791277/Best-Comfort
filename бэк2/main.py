from flask import Flask, request, jsonify, session, make_response, send_from_directory
from flask_bcrypt import Bcrypt
import psycopg2
import jwt
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'
bcrypt = Bcrypt()
UPLOAD_FOLDER = 'images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
DATABASE = {
    'user': 'postgresUser',
    'password': 'postgresPW',
    'host': 'localhost',
    'port': '5455',
    'database': 'DBBestComfort'
}
USERS_TABLE = 'users'
CARDS_TABLE = 'cards'
IMAGES_TABLE = 'card_images'

app.secret_key = 'your-secret-key'
CORS(app)

def create_tables():
    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {USERS_TABLE} (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            surname TEXT,
            job_title TEXT,
            work_group TEXT,
            about TEXT,
            avatar TEXT
        )
    ''')

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {CARDS_TABLE} (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT,
            creation_date TEXT,
            organization TEXT,
            description TEXT,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES {USERS_TABLE}(id) ON DELETE CASCADE
        )
    ''')

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {IMAGES_TABLE} (
            id SERIAL PRIMARY KEY,
            card_id INTEGER NOT NULL,
            image_url TEXT NOT NULL,
            FOREIGN KEY (card_id) REFERENCES {CARDS_TABLE}(id) ON DELETE CASCADE
        )
    ''')

    conn.commit()
    conn.close()

create_tables()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    password = data.get('password')
    email = data.get('email')

    if password and email:
        conn = psycopg2.connect(**DATABASE)
        cursor = conn.cursor()
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        role = 'user'
        about = ''
        avatar = ''
        name = ''
        cursor.execute(f'''
            INSERT INTO {USERS_TABLE} (email, password, role, about, avatar, name)
            VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
        ''', (email, hashed_password, role, about, avatar, name))
        user_id = cursor.fetchone()[0]
        conn.commit()
        conn.close()

        payload = {
            '_id': user_id,
            'email': email,
            'name': '',
            'role': 'user'
        }
        token = jwt.encode(payload, app.secret_key, algorithm='HS256')

        response = {
            'data': {
                '_id': user_id,
                'email': email
            }
        }
        return jsonify(response), 200, {'Set-Cookie': f'token={token}; Path=/'}

    return jsonify({'error': 'Invalid request'}), 400

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    password = data.get('password')
    email = data.get('email')

    if password and email:
        conn = psycopg2.connect(**DATABASE)
        cursor = conn.cursor()
        cursor.execute(f'''
            SELECT id, password, role, name FROM {USERS_TABLE}
            WHERE email = %s
        ''', (email,))
        user = cursor.fetchone()
        conn.close()

        if user:
            user_id, hashed_password, role, name = user
            if bcrypt.check_password_hash(hashed_password, password):
                payload = {
                    '_id': user_id,
                    'email': email,
                    'name': name,
                    'role': role
                }
                token = jwt.encode(payload, app.secret_key, algorithm='HS256')
                response = {'token': token}
                json_resp = jsonify(response)
                json_resp.set_cookie('token', token)
                return json_resp

        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify({'error': 'Invalid request'}), 400

@app.route('/users/<int:user_id>/cards', methods=['POST'])
def create_card(user_id):
    # Verify if the user is an admin or the same user as in the token
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    creation_date = data.get('creation_date')
    organization = data.get('organization')
    description = data.get('description')

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        INSERT INTO {CARDS_TABLE} (name, user_id, address, creation_date, organization, description)
        VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
    ''', (name, user_id, address, creation_date, organization, description))
    card_id = cursor.fetchone()[0]
    conn.commit()

    response = {
        'name': name,
        'address': address,
        'creation_date': creation_date,
        'organization': organization,
        'description': description,
        'images': [],
        '_id': str(card_id),
        'user_id': str(user_id)
    }

    conn.close()

    return jsonify(response), 201

@app.route('/users/<int:user_id>/cards', methods=['GET'])
def get_user_cards(user_id):
    # Verify if the user is an admin or the same user as in the token
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        SELECT c.id, c.name, c.address, c.creation_date, c.organization, c.description, c.user_id, u.name, u.about, u.avatar, ci.id, ci.image_url
        FROM {CARDS_TABLE} AS c
        INNER JOIN {USERS_TABLE} AS u ON c.user_id = u.id
        LEFT JOIN {IMAGES_TABLE} AS ci ON c.id = ci.card_id
        WHERE c.user_id = %s;
    ''', (user_id,))
    rows = cursor.fetchall()

    cards = {}
    for row in rows:
        card_id = str(row[0])
        card_name = row[1]
        address = row[2]
        creation_date = row[3]
        organization = row[4]
        description = row[5]
        image_id = row[10]
        image_path = row[11]

        if card_id not in cards:
            cards[card_id] = {
                '_id': card_id,
                'name': card_name,
                'address': address,
                'creation_date': creation_date,
                'organization': organization,
                'description': description,
                'images': []
            }

        if image_path:
            cards[card_id]['images'].append(
                {
                    "_id": image_id,
                    "url": image_path
                }
            )

    response = list(cards.values())

    conn.close()

    return jsonify(response), 200

@app.route('/users/<int:user_id>/cards/<int:card_id>', methods=['PATCH'])
def update_card(user_id, card_id):
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    data = request.get_json()
    updated_fields = {}

    name = data.get('name')
    address = data.get('address')
    creation_date = data.get('creation_date')
    organization = data.get('organization')
    description = data.get('description')
    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        SELECT name, address, creation_date, organization, description
        FROM {CARDS_TABLE}
        WHERE id = %s AND user_id = %s
    ''', (card_id, user_id,))
    card = cursor.fetchone()

    if not card:
        return jsonify({'error': 'Card not found'}), 404

    current_name, current_address, current_creation_date, current_organization, current_description = card

    if name is None:
        name = current_name
    if address is None:
        address = current_address
    if creation_date is None:
        creation_date = current_creation_date
    if organization is None:
        organization = current_organization
    if description is None:
        description = current_description

    cursor.execute(f'''
        UPDATE {CARDS_TABLE}
        SET name = %s, address = %s, creation_date = %s, organization = %s, description = %s
        WHERE id = %s AND user_id = %s
    ''', (name, address, creation_date, organization, description, card_id, user_id, ))
    conn.commit()

    response = {
        '_id': str(card_id),
        'user_id': str(user_id),
        'name': name,
        'address': address,
        'creation_date': creation_date,
        'organization': organization,
        'description': description
    }

    conn.close()

    return jsonify(response), 200



@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()
    cursor.execute(f'''
        SELECT email, role, name, surname, job_title, work_group, about, avatar
        FROM {USERS_TABLE}
        WHERE id = %s
    ''', (user_id,))
    user = cursor.fetchone()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    email, role, name, surname, job_title, work_group, about, avatar = user
    response = {
        'email': email,
        'role': role,
        'name': name,
        'surname': surname,
        'job_title': job_title,
        'work_group': work_group,
        'about': about,
        'avatar': avatar,
        '_id': str(user_id)
    }

    conn.close()

    return jsonify(response), 200

@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    hashed_password = None
    if (password):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    surname = data.get('surname')
    job_title = data.get('job_title')
    work_group = data.get('work_group')
    about = data.get('about')
    avatar = data.get('avatar')

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        SELECT name, surname, job_title, work_group, about, avatar, email, password
        FROM {USERS_TABLE}
        WHERE id = %s
    ''', (user_id,))
    user = cursor.fetchone()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    current_name, current_surname, current_job_title, current_work_group, current_about, current_avatar, current_email, current_password = user

    if name is None:
        name = current_name
    if surname is None:
        surname = current_surname
    if job_title is None:
        job_title = current_job_title
    if work_group is None:
        work_group = current_work_group
    if about is None:
        about = current_about
    if avatar is None:
        avatar = current_avatar
    if email is None:
        email = current_email
    if hashed_password is None:
        hashed_password = current_password

    cursor.execute(f'''
        UPDATE {USERS_TABLE}
        SET name = %s, surname = %s, job_title = %s, work_group = %s, about = %s, avatar = %s, email = %s, password = %s
        WHERE id = %s
    ''', (name, surname, job_title, work_group, about, avatar, email, hashed_password, user_id))
    conn.commit()

    response = {
        'name': name,
        'surname': surname,
        'job_title': job_title,
        'work_group': work_group,
        'about': about,
        'avatar': avatar,
        'email': email,
        '_id': str(user_id)
    }

    conn.close()

    return jsonify(response), 200

@app.route('/users', methods=['GET'])
def get_users():
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        SELECT id, email, role, name, surname, job_title, work_group, about, avatar
        FROM {USERS_TABLE}
    ''')
    users = cursor.fetchall()

    response = []
    for user in users:
        user_id, email, role, name, surname, job_title, work_group, about, avatar = user
        user_data = {
            '_id': str(user_id),
            'email': email,
            'role': role,
            'name': name,
            'surname': surname,
            'job_title': job_title,
            'work_group': work_group,
            'about': about,
            'avatar': avatar
        }
        response.append(user_data)

    conn.close()

    return jsonify(response), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Verify if the user is an admin
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        DELETE FROM {USERS_TABLE}
        WHERE id = %s
    ''', (user_id,))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'User not found'}), 404

    conn.close()

    return jsonify({'message': 'User deleted successfully'}), 200

@app.route('/users/<int:user_id>/cards/<int:card_id>', methods=['DELETE'])
def delete_user_card(user_id, card_id):
    # Verify if the user is an admin or the same user as in the token
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        DELETE FROM {CARDS_TABLE}
        WHERE id = %s AND user_id = %s
    ''', (card_id, user_id))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Card not found'}), 404

    conn.close()

    return jsonify({'message': 'Card deleted successfully'}), 200

@app.route('/users/<int:user_id>/cards/<int:card_id>/images', methods=['POST'])
def upload_card_image(user_id, card_id):
    # Verify if the user is an admin or the same user as in the token
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    # Check if the 'image' file is included in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    image_file = request.files['image']

    # Process and save the uploaded image file as needed
    # For example, you can save it to a specific directory or store it in a database

    # Replace the code below with your actual file processing and storage logic
    file_name = secure_filename(image_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
    image_file.save(file_path)

    file_path = file_path.replace('\\', '/')
    path_components = file_path.split(os.path.sep)
    path_components = [component for component in path_components if component]
    url_path = '/' + '/'.join(path_components)

    # Update the card entry in the database with the file information
    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    # Insert the image file information into the card_images table
    cursor.execute(f'''
        INSERT INTO {IMAGES_TABLE} (card_id, image_url)
        VALUES (%s, %s)
    ''', (card_id, url_path))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Image uploaded successfully'}), 200

@app.route('/users/<int:user_id>/cards/<int:card_id>/images/<int:image_id>', methods=['DELETE'])
def delete_card_image(user_id, card_id, image_id):
    token = request.headers.get('Authorization')
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        if decoded_token['role'] != 'admin' and decoded_token['_id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

    conn = psycopg2.connect(**DATABASE)
    cursor = conn.cursor()

    cursor.execute(f'''
        DELETE FROM {IMAGES_TABLE}
        WHERE id = %s AND card_id = %s
    ''', (image_id, card_id))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Image not found'}), 404

    conn.close()

    return jsonify({'message': 'Image deleted'}), 200

@app.route('/validate', methods=['POST'])
def validate_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token not found'}), 401

    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        user_id = decoded_token.get('_id')
        if not user_id:
            return jsonify({'error': 'Invalid token'}), 401

        # Additional validation checks or actions can be performed here

        return jsonify({'message': 'Token is valid', 'user_id': user_id}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except (jwt.InvalidTokenError, KeyError):
        return jsonify({'error': 'Invalid token'}), 401

@app.route('/images/<path:image_name>')
def get_image(image_name):
    image_dir = app.config['UPLOAD_FOLDER']  # Update this with your actual image directory
    return send_from_directory(image_dir, image_name)

if __name__ == '__main__':
    app.run()
