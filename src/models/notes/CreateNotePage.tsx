import WidgetList from "../widgets/WidgetList";
import Button from "../../components/common/button/button";
import Input from "../../components/common/input/input";
import Title from "../../components/common/title/title";

const CreateNotePage = () => {
  return (
    <>
      <WidgetList />
      <Title className="note-title">Создание заметки</Title>
      <div className="create-note-container">
        <Input maxLength={100} placeholder="Введите заголовок:" compSize="lg" />
        <div className="container-note-body">
          <Button>Сохранить</Button>
        </div>
      </div>
    </>
  );
};

export default CreateNotePage;
