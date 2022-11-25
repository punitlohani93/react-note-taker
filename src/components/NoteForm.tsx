import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'
import { NoteData, Tag } from "../App";

export interface INoteFormProps extends Partial<NoteData> {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NoteForm({ onSubmit, onAddTag, availableTags, title = '', markdown = '', tags = [] }: INoteFormProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    const navigate = useNavigate()
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: inputRef.current!.value,
            markdown: textareaRef.current!.value,
            tags: selectedTags,
        })
        navigate('..')
    }

    const onCreateOption = (label: string) => {
        const newTag = { id: uuidV4(), label }
        onAddTag(newTag)
        setSelectedTags(prev => [...prev, newTag])
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={inputRef} required defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                onCreateOption={onCreateOption}
                                value={selectedTags.map(({id: value, label} : Tag) => {
                                    return { value, label }
                                })}
                                options={availableTags.map(({ label, id: value}) => {
                                    return { label , value }
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
                    <Form.Control required as="textarea" ref={textareaRef} rows={15} defaultValue={markdown} />
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