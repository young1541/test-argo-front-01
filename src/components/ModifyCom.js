import StyledButton from "./common/StyleButton";
import StyleForm from "./common/StyleForm";
import StyledInput from "./common/StyleInput";
import { ProductTitle } from "./common/StyleProduct";

const ModifyCom = ( {fileName, onChange,onSubmit,username,password, role } ) => {
    return (<>
        <ProductTitle>수 정 페 이 지</ProductTitle>
        <StyleForm onSubmit={onSubmit} width="30%">
            <StyledInput name="username" value={username} readOnly />
            <StyledInput name="password" value={password} onChange={onChange} />
            <StyledInput name="role" value={role} onChange={onChange} />
            <StyledInput name="fileName" value={fileName} type="hidden"  />
            <StyledInput type="file" name="file" onChange={onChange} />
            <StyledButton>수정</StyledButton>
        </StyleForm>
    </>)
}
export default ModifyCom;