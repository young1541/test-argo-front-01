import StyledButton from "../common/StyleButton";
import StyleForm from "../common/StyleForm";
import StyledInput from "../common/StyleInput";
import { ProductTitle } from "../common/StyleProduct";

function ModifyCom({ id, title, content, onChange, onSubmit }){
    return <>
    <ProductTitle>수정 페이지</ProductTitle>
        <StyleForm onSubmit={onSubmit} width="30%">
            <StyledInput name="id" value={id} readOnly />
            <StyledInput name="title" value={title} onChange={onChange} />
            <StyledInput name="content" value={content} onChange={onChange} />
            <StyledButton>수정</StyledButton>
        </StyleForm>
    </>
}
export default ModifyCom;