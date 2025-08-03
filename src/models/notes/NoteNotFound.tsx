import Title from "../../components/common/title/title";

export const NoteNotFound = () => {
  return (
    <div className="notes-container">
      <div className="note-card">
        <Title level={2}>Заметка не найдена</Title>
      </div>
    </div>
  );
};
