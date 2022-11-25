import { NoteData } from "../App";
import { INoteFormProps, NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

interface IEditNoteProps extends Omit<INoteFormProps, 'onSubmit'> {
    onSubmit: (id: string, data: NoteData) => void
}

export function EditNote ({ onSubmit, onAddTag, availableTags }: IEditNoteProps) {
    const note = useNote()
    return (
        <>
            <h1 className="mb-4">Edit note</h1>
            <NoteForm
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
            />
        </>
    )
}