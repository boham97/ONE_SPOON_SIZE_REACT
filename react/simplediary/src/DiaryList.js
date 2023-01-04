import DiaryItem from "./DiaryItem";

const DiaryList = ({onEdit, onRemove, diaryList}) => {
    return (
        <div className="DiaryList">
            <h2>다이어리 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다</h4>
            <div>
                {diaryList.map((it)=> (
                    <DiaryItem onEdit={onEdit} onRemove={onRemove} key={it.id} {...it}/>
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;
