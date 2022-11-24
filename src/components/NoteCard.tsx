import { Badge, Card, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Tag } from "../App"
import styles from '../styles/NoteCard.module.css'

interface INoteCardProps {
    id: string
    title: string
    tags: Tag[]
}

export const NoteCard = ({ id, title, tags }: INoteCardProps) => {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`} >
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {tags.length && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map(({ label, id }) => {
                                return (
                                    <Badge className="text-truncate" key={id}>
                                        {label}
                                    </Badge>
                                )
                            })}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}