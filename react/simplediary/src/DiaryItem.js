import { useRef, useState } from "react"

const DiaryItem = ({onEdit, onRemove, id, author, content, emotion, created_date}) => {
    const [isEdit, setIsEdit] = useState(false)
    
    const toggleIsEdit = () => setIsEdit(!isEdit)

    const [localContent, setLocalContent] = useState(content)

    const localContentInput = useRef()

    const handleRemove = () => {
        if(window.confirm("정말삭제 하시겠습니까?")){
            onRemove(id)
        }
    }

    const handleQuitEdit = () => {
        setIsEdit(false)
        setLocalContent(content)
    }
    
    const handleEdit = () => {
        if(localContent.length < 5){
            localContentInput.current.focus()
            return;
        }
        if (window.confirm("수정하시겠습니까?")){
            onEdit(id, localContent)
            toggleIsEdit()
        }

    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자: {author} | 생성시간: {new Date(created_date).toLocaleString()}</span>
                <div>감정점수: {emotion}</div>
            </div>
            <div className="content">
                {isEdit ? (
                    <textarea 
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                    />

                ) :(
                    <>{content}</>
                )}
                </div>
            {isEdit ? (
                <>
                <button onClick={handleQuitEdit}>취소</button>
                <button onClick={handleEdit}>완료</button>
                </>
            ) : (
                <>
                <button onClick={handleRemove}>삭제하기</button>
                <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )
            }
        </div>
    )
}
export default DiaryItem