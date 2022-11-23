import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from "../App";

export interface INoteFormProps {
    onSubmit: (data: NoteData) => void
}

export function NoteForm({ onSubmit }: INoteFormProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: inputRef.current!.value,
            markdown: textareaRef.current!.value,
            tags: selectedTags,
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={inputRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect 
                                value={selectedTags.map(({id: value, label} : Tag) => {
                                    return { value, label }
                                })}
                                onChange={(tags) => {
                                    setSelectedTags(tags.map(({value: id, label}) => ({
                                        id,
                                        label
                                    })))
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" ref={textareaRef} rows={15} />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit">Save</Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>

        </Form>
    )
}