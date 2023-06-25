import {useState, useCallback} from 'react';

export function useFormAndValidation() {
   const [ values, setValues ] = useState({});
   const [ errors, setErrors ] = useState({});
   const [ isValid, setIsValid ] = useState(false);

   const handleChange = (e) => {
      const {name, value} = e.target
      setValues({...values, [name]: value });
      setErrors({...errors, [name]: e.target.validationMessage});
      setIsValid(e.target.closest('form').checkValidity());
   };

   const handleImageChange = (e) => {
      const {name, files} = e.target
      setValues((oldValues) => {
         return {...oldValues, [name]: {target: e.target, value: files} }
      });
      setErrors((oldErrors) => {
         return {...oldErrors, [name]: e.target.validationMessage }
      });
      setIsValid(e.target.closest('form').checkValidity());
   };

   const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
   }, [setValues, setErrors, setIsValid]);

   return { values, handleChange, handleImageChange, errors, isValid, resetForm, setValues, setIsValid };
}

