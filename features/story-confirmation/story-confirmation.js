import { useState, useRef } from "react";
import Header from "../../components/shared/modals/styled/header";
import { Form, FormControl } from "../../components/shared/forms/form";
import TextareaAutosize from "react-textarea-autosize";
import PublishButton from "../../components/shared/buttons/publish-button";
import CloseContainer from "../auth/styled/close-container";
import Container from "./styled/container";
import IconClose from "../../components/shared/icons/close";
import AddTags from "./add-tags";

export default function ConfirmationStory({ onClose }) {
  const [excerpt, setExcerpt] = useState("");

  return (
    <Container>
      <Header>Publish Your Story</Header>
      <Form>
        <FormControl width="48" align="left" gap="0.5">
          <label htmlFor="excerpt">Write an excerpt for your story</label>
          <TextareaAutosize
            maxLength={144}
            id="excerpt"
            onChange={(e) => setExcerpt(e.target.value)}
          />
          {excerpt.length > 100 && (
            <small>{`${excerpt?.length || 0}/144`}</small>
          )}
        </FormControl>
        <FormControl width="48" align="left" gap="0.5">
          <p>Add tags so readers know what your story is about</p>
          <AddTags />
        </FormControl>
        <PublishButton>Publish now</PublishButton>
      </Form>
      <CloseContainer>
        <IconClose onClick={onClose} />
      </CloseContainer>
    </Container>
  );
}
