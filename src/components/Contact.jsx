import Navbar from "./layout/Navbar";
import classes from "./Contact.module.css";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadAllContacts } from "../redux/allContacts";
import { takeContactInfo } from "../redux/contact";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),

  lastName: Yup.string()
    .max(20, "Must be 15 characters or less")
    .required("Required"),

  city: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  country: Yup.string()
    .max(20, "Must be 15 characters or less")
    .required("Required"),
  phoneNumber: Yup.string()
    .max(20, "Must be 15 numbers or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  website: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
});

const Contact = () => {
  const contact = useSelector((state) => state.contact.value);
  const allContacts = useSelector((state) => state.allContacts.value);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (values) => {
    await dispatch(takeContactInfo(values));
    navigate("/");
  };

  const toggleFavoriteOfNot = (id) => {
    const indexOfContact = allContacts.findIndex(
      (contact) => contact.id === id
    );
    let isFavorite = allContacts[indexOfContact].isFavorite;
    const newAllContacts = JSON.parse(JSON.stringify(allContacts));
    newAllContacts[indexOfContact].isFavorite = !isFavorite;
    isFavorite = newAllContacts[indexOfContact].isFavorite;
    dispatch(uploadAllContacts(newAllContacts));

    const newContactInfo = { ...contact, isFavorite: isFavorite };
    dispatch(takeContactInfo(newContactInfo));
  };

  return (
    <div className="Contact">
      <Navbar />
      <div className={classes.contactContainer}>
        <div className={classes.upperMedia}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={contact.image} alt="contact" />
          </div>
          <div>
            {contact.isFavorite ? (
              <FaHeart
                style={{ color: "red" }}
                className={classes.heart}
                onClick={() => {
                  toggleFavoriteOfNot(contact.id);
                }}
              />
            ) : (
              <FaRegHeart
                className={classes.heart}
                onClick={() => {
                  toggleFavoriteOfNot(contact.id);
                }}
              />
            )}
          </div>
        </div>

        <Formik
          key={contact.id}
          initialValues={{
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            city: contact.city,
            country: contact.country,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
            website: contact.website,
            image: contact.image,
          }}
          validateOnBlur
          onSubmit={submit}
          validationSchema={validationSchema}
        >
          {({
            errors,
            values,
            handleChange,
            handleSubmit,
            touched,
            handleBlur,
          }) => (
            <div className={classes.formContainer}>
              <Form className={classes.form}>
                <div className={classes.leftPart}>
                  <div className={classes.field}>
                    <label>First name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.firstName && errors.firstName ? (
                      <p className={classes.errors}>{errors.firstName}</p>
                    ) : null}
                  </div>
                  <div className={classes.field}>
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.city && errors.city ? (
                      <p className={classes.errors}>{errors.city}</p>
                    ) : null}
                  </div>
                  <div className={classes.field}>
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phoneNumber && errors.phoneNumber ? (
                      <p className={classes.errors}>{errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className={classes.field}>
                    <label>Website:</label>
                    <input
                      type="text"
                      name="website"
                      value={values.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.website && errors.website ? (
                      <p className={classes.errors}>{errors.website}</p>
                    ) : null}
                  </div>
                </div>

                <div className={classes.rightPart}>
                  <div className={classes.field}>
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.lastName && errors.lastName ? (
                      <p className={classes.errors}>{errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className={classes.field}>
                    <label>Country:</label>
                    <input
                      type="text"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.country && errors.country ? (
                      <p className={classes.errors}>{errors.country}</p>
                    ) : null}
                  </div>
                  <div className={classes.field}>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? (
                      <p className={classes.errors}>{errors.email}</p>
                    ) : null}
                  </div>
                  <div className={classes.formButtonContainer}>
                    <button
                      onClick={() => handleSubmit()}
                      className={classes.formButton}
                      type="submit"
                    >
                      Save Contact
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
