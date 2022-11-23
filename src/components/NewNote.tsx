import { INoteFormProps, NoteForm } from "./NoteForm";

export function NewNote ({onSubmit}: INoteFormProps) {
    return (
        <>
            <h1 className="mb-4">New note</h1>
            <NoteForm onSubmit={onSubmit}/>
        </>
    )
}