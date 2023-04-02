import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Container,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";

import { GoBackButton } from "@certego/certego-ui";

import { Formik, Field } from "formik";

import { createComment, deleteComment } from "../../../scan/api";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("en-US", options);
}

export default function CommentOverview({ comments, jobId, refetchComments }) {
  // handle submit of form
  const onSubmit = (values) => {
    const formValues = {
      content: values.content,
      job_id: jobId,
    };
    createComment(formValues);
    // reload comments after 2.5 seconds (to give time to the backend to process the request)
    setTimeout(() => {
      // refetch comments and update the state
      refetchComments();
    }, 2500);
  };

  // handle delete comment
  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, jobId);
    // reload comments after 2.5 seconds (to give time to the backend to process the request)
    setTimeout(() => {
      // refetch comments and update the state
      refetchComments();
    }, 2500);
  };

  return (
    <Container fluid>
      <Row className="g-0 d-flex-between-end">
        <Col xs="auto">
          <GoBackButton onlyIcon color="gray" />
        </Col>

        <Col xs="auto">
          <div className="d-flex-center">
            <strong>Comments: {comments.count}</strong>
          </div>
        </Col>
      </Row>

      <Row className="g-0">
        <Col className="d-flex flex-column justify-content-center">
          <strong>Create Comment</strong>

          <Formik initialValues={{ content: "" }} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Field
                    as="textarea" // Use the Field component and set 'as' prop to "textarea"
                    name="content"
                    style={{ width: "100%" }}
                  />
                </FormGroup>
                <div className="d-flex justify-content-end">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>

      <Row className="g-0 pt-3">
        <Col>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ maxHeight: "500px", overflowY: "scroll" }}
          >
            {comments.results.map((comment) => (
              <Card key={comment.id} className="mb-3">
                <CardHeader>
                  <strong>{comment.username}</strong>
                  <span className="ms-2 text-secondary">
                    {formatDate(comment.created_at)}
                  </span>
                </CardHeader>
                <CardBody>
                  <p>{comment.content}</p>
                  {comment.current_user && (
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => handleDeleteComment(comment.id)}
                        color="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

CommentOverview.propTypes = {
  comments: PropTypes.object.isRequired,
  jobId: PropTypes.number.isRequired,
  refetchComments: PropTypes.func.isRequired,
};
