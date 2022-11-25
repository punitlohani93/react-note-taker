import { ChangeEvent, EventHandler, SetStateAction, useMemo, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from 'react-select'
import { Note, Tag } from "../App"
import { EditTagsModal, IEditTagsModalProps } from "./EditTagsModal"
import { NoteCard } from "./NoteCard"
import { INoteFormProps } from "./NoteForm"

interface INoteListProps extends Pick<INoteFormProps, 'availableTags'> {
    notes: Note[]
    onUpdateTag: IEditTagsModalProps['onUpdate']
    onDeleteTag: IEditTagsModalProps['onDelete']
}

export const NoteList = ({ availableTags, notes, onDeleteTag, onUpdateTag }: INoteListProps) => {
    const [title, setTitle] = useState<string>('')
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [editTagsModalShow, setEditTagsModalShow] = useState(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (
                selectedTags.length === 0 ||
                selectedTags.every(tag => {
                    return note.tags.some(noteTag => noteTag.id === tag.id)
                })
            )
        })
    }, [title, selectedTags, notes])
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col><h1>Notes</h1></Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal" >
                        <Link to="/new" >
                            <Button>Create</Button>
                        </Link>
                        <Button
                            onClick={() => {
                                setEditTagsModalShow(true)
                            }}
                            variant="outline-secondary"
                        >
                            Edit tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={onChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
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
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4}>
                {filteredNotes.map(({ id, tags, title }) => (
                    <Col key={id}>
                        <NoteCard id={id} tags={tags} title={title} />
                    </Col>
                ))}
            </Row>
            <EditTagsModal
                show={editTagsModalShow}
                availableTags={availableTags}
                onClose={() => { setEditTagsModalShow(false) }}
                onDelete={onDeleteTag}
                onUpdate={onUpdateTag}
            />
        </>
    )
}