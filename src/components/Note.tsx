import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"

interface INoteProps {
    onDelete: (id: string) => void
}

export const Note = ({ onDelete }: INoteProps) => {
    const navigate = useNavigate()
    const note = useNote()
    const { id, title, markdown, tags } = note
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{title}</h1>
                    {tags.length && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {tags.map(({ label, id }) => (
                                <Badge key={id} className="text-truncate">
                                    {label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                        <Button
                            onClick={() => {
                                onDelete(id)
                                navigate('/')
                            }}
                            variant="outline-danger"
                        >
                            Delete
                        </Button>
                        <Link to="..">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </>
    )
}