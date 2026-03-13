import StyledButton from "../common/StyleButton";
import StyleForm from "../common/StyleForm";
import StyledInput from "../common/StyleInput";
import { ProductTitle } from "../common/StyleProduct";

function RegCom({loading, error,title, content, onChange, onSubmit}){
    if( loading )
        return <>회원 가입 중...</>
    if(error)
        return <>{error}</>
    return <>
        <ProductTitle>글 등록 페이지</ProductTitle>
        <StyleForm onSubmit={onSubmit} width="30%">
            <StyledInput name="title" value={title} onChange={onChange} 
                                                    placeholder="input title"/>
            <StyledInput name="content" value={content} onChange={onChange} 
                                                    placeholder="input content"/>
            <StyledButton>글 등록</StyledButton>
        </StyleForm>
    </>
}
export default RegCom;