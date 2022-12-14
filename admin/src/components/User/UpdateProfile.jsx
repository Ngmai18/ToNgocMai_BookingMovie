import React, { Fragment, useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("address", address);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Ch???nh s???a th??nh c??ng");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Ch???nh s???a th??ng tin t??i kho???n</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>H??? v?? t??n</label>
                        <Form.Control
                          // defaultValue={name}
                          //   disabled
                          required
                          placeholder={name}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Form.Control
                          placeholder={email}
                          required
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>M???t kh???u</label>
                        <Form.Control
                          //   defaultValue="Mike"
                          required
                          placeholder={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Nh???p l???i m???t kh???u</label>
                        <Form.Control
                          //   defaultValue="Andrew"
                          placeholder={password}
                          type="password"
                          required
                          //   onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>?????a ch??? hi???n t???i</label>
                        <Form.Control
                          required
                          //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder={address}
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>S??? ??i???n tho???i</label>
                        <Form.Control
                          required
                          //   defaultValue="Mike"
                          placeholder={phone}
                          type="number"
                          onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right createAccount"
                    type="submit"
                    variant="info"
                  >
                    Ch???nh s???a
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    // <div className="updateProfileContainer">
    //   <div className="updateProfileBox">
    //     <h2 className="updateProfileHeading">Ch???nh s???a th??ng tin c?? nh??n</h2>

    //       <div className="updateProfileName">
    //         <FaceIcon />
    //         <input
    //           type="text"
    //           placeholder="H??? t??n"
    //           required
    //           name="name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //       </div>
    //       <div className="updateProfileEmail">
    //         <MailOutlineIcon />
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           required
    //           name="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>

    //       <div id="updateProfileImage">
    //         <img src={avatarPreview} alt="Avatar Preview" />
    //         <input
    //           type="file"
    //           name="avatar"
    //           accept="image/*"
    //           onChange={updateProfileDataChange}
    //         />
    //       </div>
    //       <input
    //         type="submit"
    //         value="Ch???nh s???a"
    //         className="updateProfileBtn"
    //       />
    //     </form>
    //   </div>
    // </div>
  );
};

export default UpdateProfile;
