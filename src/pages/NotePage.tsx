import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(Number(id))) {
      navigate("/", { replace: true });
    }
  }, [id, navigate]);

  return (
    <div className="notes-container">
      <div className="note-card ">
        <h1 className="note-title">Заметка номер {id}</h1>
        <div>Какое-то содержимое</div>
        <div>Дата</div>
      </div>
    </div>
  );
};

export default NotePage;
