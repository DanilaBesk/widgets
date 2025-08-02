import WidgetList from "../widgets/WidgetList";
import Button from "../../components/common/button/button";

const CreateNotePage = () => {
  return (
    <>
      <Button>123333</Button>
      <h1 className="note-title">Создание заметки</h1>
      <div className="create-note-container">
        <div className="container-note-title">
          <h1 className="note-title"> Введите заголовок:</h1>
          <input type="text" />
        </div>
        <div className="container-note-body">
          <input type="text" />
        </div>
      </div>
      <WidgetList />
    </>
  );
};

export default CreateNotePage;
