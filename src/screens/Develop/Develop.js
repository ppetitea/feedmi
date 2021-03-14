import React, { useEffect } from "react";
import { Button, ButtonBase, Icon, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import palette, { primary, secondary } from "../../constants/colors/palette";
import Layout from "../../fragments/Layout";
import Typo from "../../fragments/Typo";
import useWindowSize from "../../hooks/useWindowSize";
import firebase from "firebase/app";
import { useFormik } from "formik";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { connect } from "react-redux";
import useBoolean from "../../hooks/useBoolean";

// import "firebase/auth";

// const useFirebase = () => {
//   const firebaseConfig = {
//     apiKey: "AIzaSyAjMN8ziJ-V3Yepzy2EzDBbNrStSnqP8FI",
//     authDomain: "feedmi-7c574.firebaseapp.com",
//     databaseURL:
//       "https://feedmi-7c574-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "feedmi-7c574",
//     storageBucket: "feedmi-7c574.appspot.com",
//     messagingSenderId: "351827549147",
//     appId: "1:351827549147:web:2bdf80dd902fe64ac6e5fe",
//   };

//   // Initialize Firebase
//   useEffect(() => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     } else {
//       firebase.app(); // if already initialized, use that one
//     }
//     return () => {};
//   }, []);
// };

// const createUser = (email, password) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
// };

const DevelopPage = (props) => {
  const {} = props;

  const test = useBoolean();

  return (
    <Layout>
      <div style={{ borderStyle: "solid" }}>
        <input
          key={"inputKey"}
          type={"text"}
          onFocus={test.enable}
          onBlur={test.disable}
        />
      </div>
    </Layout>
  );
  //   const { vh, vw } = useWindowSize();
  //   const router = useHistory();

  //   useFirebase();

  //   const formik = useFormik({
  //     initialValues: {
  //       email: "",
  //       password: "",
  //     },
  //     onSubmit: (values) => {
  //       console.log(values);
  //       createUser(values.email, values.password);
  //     },
  //   });

  //   return (
  //     <Layout margin={0} height={vh(1)} width={vw(1)}>
  //       <Layout
  //         variant="form"
  //         forwardedProps={{ onSubmit: formik.handleSubmit }}
  //         margin={10}
  //         mode="contained"
  //         color={"white"}
  //         elevation={4}
  //         hmax={vh(0.4)}
  //         bgColor={palette.primary.background}
  //       >
  //         <TextField
  //           fullWidth
  //           id="email"
  //           name="email"
  //           label="Email"
  //           value={formik.values.email}
  //           onChange={formik.handleChange}
  //           error={formik.touched.email && Boolean(formik.errors.email)}
  //           helperText={formik.touched.email && formik.errors.email}
  //         />
  //         <TextField
  //           fullWidth
  //           id="password"
  //           name="password"
  //           label="Password"
  //           type="password"
  //           value={formik.values.password}
  //           onChange={formik.handleChange}
  //           error={formik.touched.password && Boolean(formik.errors.password)}
  //           helperText={formik.touched.password && formik.errors.password}
  //         />
  //         <Layout
  //           variant="button"
  //           onPress={formik.handleSubmit}
  //           forwardedProps={{ type: "submit" }}
  //           marginT="auto"
  //           margin={10}
  //           row={true}
  //           mode="contained"
  //           color={primary}
  //           hmax={40}
  //         >
  //           <Typo variant="button" color={palette.primary.text}>
  //             Inscription
  //           </Typo>
  //         </Layout>
  //         <Layout
  //           row={true}
  //           mode="contained"
  //           color={primary}
  //           radius={50}
  //           width={vw(0.1)}
  //           height={vw(0.1)}
  //           hmax={vw(0.1)}
  //           onPress={() => console.log("alarme")}
  //         >
  //           <AccessAlarmIcon color="action" />
  //         </Layout>
  //       </Layout>
  //     </Layout>
  //   );
};

const MapStateToProps = (state) => ({
  app: state.app,
  auth: state.auth,
});

export default connect(MapStateToProps)(DevelopPage);
