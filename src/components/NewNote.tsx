import { INoteFormProps, NoteForm } from "./NoteForm";

export function NewNote ({ onSubmit, onAddTag, availableTags }: INoteFormProps) {
    return (
        <>
            <h1 className="mb-4">New note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    )
}