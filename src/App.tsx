import "./index.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Мои заметки</h1>
        <button className="add-note-btn">+ Новая заметка</button>
      </header>

      <div className="notes-container">
        <div className="note-card">
          <div className="note-header">
            <h2 className="note-title">ЗАГОЛОВОК</h2>
            <div className="note-actions">
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑</button>
            </div>
          </div>
          <div className="note-content">
            <p>ИМЯ</p>
          </div>
          <div className="note-date">Сегодня, 15:30</div>
        </div>

        <div className="note-card new-note-template">
          <div className="note-header">
            <input
              type="text"
              className="note-title-input"
              placeholder="Введите заголовок"
            />
          </div>
          <div className="note-content">
            <textarea
              className="note-content-input"
              placeholder="Начните писать заметку..."
            ></textarea>
          </div>
          <div className="note-actions-bottom">
            <button className="save-btn">Сохранить</button>
            <button className="cancel-btn">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
