import styled from "styled-components";
import { ProductTitle } from "../common/StyleProduct";
import StyledButton from "../common/StyleButton";

const InfoWrap = styled.div`
    width : 30%; margin : auto;
    border : 1px solid gray;
    border-radius : 5px;
    font-size : 24px;
    padding : 20px;
`;
function InfoCom({username, onModifyForm, onDelete, dataOne, loading, error}){
    if( loading )
        return <>데이터를 가져오는 중 . . . </>
    if( error )
        return <>{error}</>
    return <>
        <ProductTitle>상 세 페 이 지</ProductTitle>
        <InfoWrap>
            { dataOne && <>
                번호 : {dataOne.id} / 작성자 : {dataOne.memberUsername}<hr />
                제목 : {dataOne.title}<hr />
                내용<br />
                - { dataOne.content}<hr />
            </>}
            { dataOne?.memberUsername === username && <>
                <StyledButton onClick={onDelete}>삭제</StyledButton>
                <StyledButton onClick={onModifyForm}>수정</StyledButton>
            </>}
        </InfoWrap>
    </>
}
export default InfoCom;