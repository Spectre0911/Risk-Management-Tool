import { useFormik } from "formik";
const GanttForm = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        start: "",
        end: "",
      },
    });
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name">Name</label>
      <input
        value={values.name}
        onChange={handleChange}
        id="name"
        type="string"
        placeholder="Feature name"
        onblur={handleBlur}
      />
      <label htmlFor="name">Start Date</label>
      <input
        value={values.email}
        onChange={handleChange}
        id="start"
        type="date"
        placeholder="Feature start date"
        onblur={handleBlur}
      />
      <label htmlFor="end">End Date</label>
      <input
        value={values.end}
        onChange={handleChange}
        id="end"
        type="date"
        placeholder="Feature end date"
        onblur={handleBlur}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
export default GanttForm;
