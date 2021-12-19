import { useRef, useState } from "react";

const useFormData = (initial) => {
  const form = useRef(initial);
  const [formData, setFormData] = useState({});
  const getFormData = () => {
    const fd = new FormData(form.current);
    const obj = {};
    fd.forEach((value, key) => {
<<<<<<< HEAD
      if (key.includes("nested")) {
        const [p0, p1, p2, p3] = key.split("||");
=======
      if (key.includes('nested')) {
        const [p1, p2, p3] = key.split('||');
>>>>>>> 5bdeae6148b79786891269083504ca2b9bd8d04c
        if (Object.keys(obj).includes(p1)) {
          if (Object.keys(obj[p1]).includes(p2)) {
            obj[p1][p2][p3] = value;
          } else {
            obj[p1][p2] = {
              [p3]: value
            };
          }
        } else {
          obj[p1] = {
            [p2]: {
              [p3]: value
            }
          };
        }
      } else {
        obj[key] = value;
      }
    });
    console.log(obj);
    return obj;
  };
  const updateFormData = () => {
    setFormData(getFormData());
  };
  return { form, formData, updateFormData };
};

export default useFormData;
