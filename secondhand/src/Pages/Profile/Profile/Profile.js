import "./Profile.css";
import React, { useEffect, useState } from "react";
import { getCroppedImage } from "../../../utils/cropImage";
import { dataURLtoFile } from "../../../utils/dataURltoFile";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateUser,removeProfilePicture } from "../../../features/userSliceActions";
import Spinner from "react-bootstrap/Spinner";

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const hiddenFileInput = React.useRef(null);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [readerResult, setReaderResult] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const convertImagesToFormData = async (data) => {
    var formData = new FormData();
    const canvas = await getCroppedImage(data);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrltoFile = dataURLtoFile(
      canvasDataUrl,
      "profilePicture.jpg"
    );
    return new Promise((resolve) => {
      formData.append("profileImage", convertedUrltoFile);
      resolve(formData);
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ name: file.name, data: reader.result });
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleButtonClick = () => {
    hiddenFileInput.current.click();
  };

  const updateUserInfo = () => {
    const data = {
      userdata: {
        name: name,
        lastname: lastName
      },
      formData: formData,
    };
    setIsLoading(true);
    setTimeout(() => {
      dispatch(updateUser(data));
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setName(user.name);
    setLastName(user.lastname);
    setReaderResult(null);
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(removeProfilePicture());
  };

  useEffect(() => {
    if (!imageFile) return;

    const convertImage = async () => {
      let file = imageFile;
      let convertedImage = await convertToBase64(file);
      setReaderResult(convertedImage.data);
      let formdata = await convertImagesToFormData(convertedImage.data);
      setFormData(formdata);
    };
    convertImage();
  }, [imageFile]);

  useEffect(() => {
    setName(user.name);
    setLastName(user.lastname);
    setProfilePicture(user.profilePicture);
  }, [user]);

  return (
    <div className="profile-container">
      <Breadcrumb>
        <Breadcrumb.Item href="/profil">My profile</Breadcrumb.Item>
        <Breadcrumb.Item href="/profile" active>
          Profile
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="profile-content">
        <Row className="profile-content-row">
          <Col className="profile-content-col content-profileImage" lg={3}>
            <div className="content-profileImage-div">
              <Avatar
                alt="avatar"
                src={
                  readerResult
                    ? readerResult
                    : profilePicture !== ""
                    ? profilePicture
                    : ""
                }
                sx={{ width: 180, height: 180 }}
              ></Avatar>
            </div>
            <div className="between">
              <Form.Control
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleFileChange}
                style={{ display: "none" }}
              ></Form.Control>
              <Button
                className="avatar-control-buttons"
                variant="primary"
                onClick={handleButtonClick}
              >
                Endre
              </Button>
              <Button
                className="avatar-control-buttons"
                variant="outline-danger"
                onClick={(e) => handleReset(e)}
              >
                Reset
              </Button>
            </div>
          </Col>

          <Col lg={4} className="profile-content-col user-actions">
            <Form>
              <Form.Group className="profile-form-element">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="Email"
                  defaultValue={user.email}
                  disabled
                />
              </Form.Group>
              <Row className="profile-form-element">
                <Col>
                  <Form.Group>
                    <Form.Label>Navn</Form.Label>
                    <Form.Control
                      type="text"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Etternavn</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName || ""}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <div className="profile-control-buttons">
              <Button
                className="control-button"
                variant="outline-primary"
                onClick={handleCancel}
              >
                Avbryt
              </Button>
              {isLoading ? (
                <Button className="control-button">
                  <Spinner animation="border" size="sm" className="me-3" />
                  Lagrer...
                </Button>
              ) : (
                <Button
                  className="control-button"
                  variant="primary"
                  onClick={updateUserInfo}
                >
                  Lagre
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
