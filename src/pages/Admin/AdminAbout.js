import React from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  //  Guard
  if (!portfolioData || !portfolioData.about) {
    return null;
  }

  const {
    skills = [],
    lottieURL,
    description1,
    description2,
  } = portfolioData.about;

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills
        .split(",")
        .map((skill) => skill.trim());

      dispatch(showLoading());

      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        skills: tempSkills,
        _id: portfolioData.about._id,
      });

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          lottieURL,
          description1,
          description2,
          skills: skills.join(", "),
        }}
      >
        <Form.Item name="lottieURL" label="Lottie URL">
          <input placeholder="Lottie URL" />
        </Form.Item>

        <Form.Item name="description1" label="Description 1">
          <textarea placeholder="Description 1" />
        </Form.Item>

        <Form.Item name="description2" label="Description 2">
          <textarea placeholder="Description 2" />
        </Form.Item>

        <Form.Item name="skills" label="Skills">
          <textarea placeholder="Comma separated skills" />
        </Form.Item>

        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
