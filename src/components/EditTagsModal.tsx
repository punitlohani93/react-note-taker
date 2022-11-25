import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../App"

export interface IEditTagsModalProps {
    availableTags: Tag[]
    show: boolean
    onClose: () => void
    onUpdate: (id: string, label: string) => void
    onDelete: (id: string) => void
}

export const EditTagsModal = ({ availableTags, show, onClose, onDelete, onUpdate }: IEditTagsModalProps) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Edit tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(({ id, label }) => (
                            <Row key={id}>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        value={label}
                                        onChange={(e) => {
                                            onUpdate(id, e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        onClick={() => {
                                            onDelete(id)
                                        }}
                                        variant="outline-danger"
                                    >
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}