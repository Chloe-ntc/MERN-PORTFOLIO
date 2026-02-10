import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form } from "antd";
import { showLoading, hideLoading, ReloadData } from "../../redux/rootSlice";
import { message } from "antd";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies?.split(" , ") || [];
      values.technologies = tempTechnologies;
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", {
          values,
          _id: portfolioData.intro._id,
        });
      }
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(hideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(hideLoading());
        dispatch(ReloadData(true));
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
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {

            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col">
            <h1 className="text-primary text-xl font-bold">
              {project.title}
            </h1>
            <hr />
            <img src={project.image} alt="" className="h-60 w-80" />
            <h1>Role : {project.title}</h1>
            <h1>Description : {project.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button className="bg-red-500 text-white px-5 py-2 "
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
              <button className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
                }}>
                Edit</button>
            </div>
          </div>
        ))}
      </div>

      {
        (type === "add" || selectedItemForEdit) && (
          <Modal
            open={showAddEditModal}
            title={selectedItemForEdit ? "Edit Project" : "Add Project"}
            onCancel={() => {
              setShowAddEditModal(false);
              setSelectedItemForEdit(null);
            }}
            footer={null}
          >
            <Form
              layout="vertical"
              initialValues={{
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies?.join(" , "),

              } || {}}
              onFinish={onFinish}
            >
              <Form.Item name="title" label="Title">
                <input placeholder="Title" />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <textarea placeholder="Description" />
              </Form.Item>

              <Form.Item name="technologies" label="Technologies">
                <input placeholder="Technologies" />
              </Form.Item>

              <Form.Item name="link" label="Link">
                <input placeholder="Link" />
              </Form.Item>
              <Form.Item name="image" label="Project Image (URL)">
                <input placeholder=" image URL" />
              </Form.Item>


              <div className="flex gap-3">
                <button
                  type="button"
                  className="border border-primary text-primary px-5 py-2"
                  onClick={() => {
                    setShowAddEditModal(false);
                    setSelectedItemForEdit(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 ml-auto"
                >
                  {selectedItemForEdit ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          </Modal>
        )
      }
    </div>
  );
}

export default AdminProjects;
