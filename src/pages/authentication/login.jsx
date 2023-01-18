import React, { useState } from "react";
import { publicHeader, url, tokenHeader } from "../../helpers/config";
import { classes } from "../../data/layouts";
import axios from "axios";
import UserProfile from "../../assets/images/user/pms.png";
import useFullPageLoader from "../../components/hooks/useFullPageLoader";
// import useQueryLogin from "../../helpers/useQueryLogin";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Nav,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SignIn, ForgotPassword, CreateAccount } from "../../constant";

// import { InputChangeEventArgsDescription } from "igniteui-react-core";

const Login = () => {
  let [loading, setLoading] = useState(false);
  // let [isLogin, setIsLogin] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [togglePassword, setTogglePassword] = useState(false);
  // const {componentsData, componentsLoading, componentsError, componentsRefetch} = useQueryLogin();

  // const [selected, setSelected] = useState("firebase");
  const iniState = {
    email: "",
    password: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      email: yup
        .string()
        .required("Field Email Wajib di isi")
        .email()
        .matches(
          /^[A-Z0-9._%+-]+@(?=gmail.com)[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Harus menggunakan gmail.com"
        ),
      password: yup
        .string()
        .required("Password Wajib di isi")
        .min(6, "Password yang di isi minimal 6 charater"),
    })
    .required();
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const handleChange = async (data) => {
    console.log("response api", url);
    setLoading(true);
    try {
      let response = await axios({
        url: `${url.api}/auth/login`,
        method: "POST",
        headers: tokenHeader(),
        data: data,
      });
      if (response.status === 200) {
        console.log("res", response);
        let dataToken = response.data.token;
        console.log("generate token", dataToken);
        localStorage.setItem("token", dataToken);
        let dataRole = response.data.user.level;
        let dataProfile = response.data.user.username;
        localStorage.setItem("profile", dataProfile);
        console.log("dataRole", dataRole);
        console.log("dataProfile", dataProfile);
        localStorage.setItem("role", dataRole);
        // let getUserRole = JSON.parse(localStorage.getItem("dataUser"));
        // console.log("data role", getUserRole.level);
        if (dataToken && dataRole && dataProfile) {
          return (window.location.href = `${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`);
        }
        if (!dataToken && !dataRole && !dataProfile) {
          return (window.location.href = `${process.env.PUBLIC_URL}`);
        }
      }
      if (response.status === 401) {
        // console.log("res", response);
        // localStorage.removeItem("profile");
        // localStorage.removeItem("token");
        // localStorage.removeItem("role");
        return (window.location.href = `${process.env.PUBLIC_URL}`);
      }
    } catch (error) {
      console.log(error.messege);
    }
  };
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  return (
    <Container fluid={true} className="p-0 mt-5">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div className="d-flex justify-content-center mb-5">
                <img
                  className="img-fluid for-light"
                  src={UserProfile}
                  width="25%"
                  alt="EMS"
                />
                <img
                  className="img-fluid for-dark"
                  src={UserProfile}
                  width="25%"
                  alt="EMS"
                />
              </div>
              <div className="login-main login-tab">
                <Nav className="border-tab flex-column" tabs></Nav>
                {/* <TabContent activeTab={selected} className="content-login"> */}

                {/* </TabContent> */}
                <Form
                  className="theme-form"
                  onSubmit={handleSubmit(handleChange)}
                >
                  <FormGroup>
                    <Label className="col-form-label">Alamat Email</Label>
                    <input
                      type="email"
                      placeholder="Masukan Email Anda"
                      {...register("email")}
                      className={`form-control ${
                        errors.email?.message ? "is-invalid" : "is-valid"
                      }`}
                    />
                    {errors.email && (
                      <p className="fw-bold text-danger">
                        {errors.email.message}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3 position-relative">
                    <Label className="col-form-label" htmlFor="password">
                      Password
                    </Label>
                    <input
                      id="password"
                      type={togglePassword ? "text" : "password"}
                      name="password"
                      {...register("password")}
                      placeholder="Masukan Password Anda"
                      className={`form-control ${
                        errors.password?.message ? "is-invalid" : "is-valid"
                      }`}
                    />
                    <div
                      className="show-hide"
                      onClick={() => HideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                    {errors.password && (
                      <p className="fw-bold text-danger">
                        {errors.password.message}
                      </p>
                    )}
                  </FormGroup>
                  <div className="login-btn mb-0">
                    <Link
                      className="link"
                      to={`${process.env.PUBLIC_URL}/forgotpass`}
                    >
                      {ForgotPassword}
                    </Link>
                    <Button color="primary" type="submit">
                      {SignIn}
                    </Button>
                  </div>
                  <p className="mt-1 mb-0">
                    {"Don't have account?"}
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/register`}
                    >
                      {CreateAccount}
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
