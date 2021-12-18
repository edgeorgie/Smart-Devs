import axios from "axios";

const uploadFormData = async (formData) => {
<<<<<<< HEAD
  const formDataCopy = { ...formData };
  await Promise.all(
    Object.keys(formDataCopy).map(async (field) => {
      if (
        Object.prototype.isPrototypeOf.call(File.prototype, formDataCopy[field])
      ) {
        const dt = new FormData();
        dt.append("file", formDataCopy[field]);
        dt.append("upload_preset", "klxbskrc");
        dt.append("cloud_name", "smartdevs");
        const options = {
          method: "POST",
          url: "https://api.cloudinary.com/v1_1/smartdevs/image/upload",
          data: dt
        };
        await axios.request(options).then((response) => {
          formDataCopy[field] = response.data.url;
        })
        .catch((error) => {
          console.error('err', error);
        });
      }
    })
  );
  return formDataCopy;
=======
  await Promise.all(
    Object.keys(formData).map(async (field) => {
      if (
        Object.prototype.isPrototypeOf.call(File.prototype, formData[field])
      ) {
        const dt = new FormData();
        dt.append("file", formData[field]);
        dt.append("upload_preset", "vs8gsai6");
        dt.append("cloud_name", "danyel117");
        const options = {
          method: "POST",
          url: "https://api.cloudinary.com/v1_1/danyel117/image/upload",
          data: dt
        };
        await axios
          .request(options)
          .then(function (response) {
            formData[field] = response.data.url;
          })
          .catch(function (error) {
            console.error("err", error);
          });
      }
    })
  );
  return formData;
>>>>>>> 1da989db537a1c2fd7d2ede0f434b82a774593f1
};

export { uploadFormData };
