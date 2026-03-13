import {StyleContentBlock, StyleContentWrap} from "./common/StyleContent"
import StyleForm from "./common/StyleForm"
import {ProductTitle} from "./common/StyleProduct"
import StyleInput from "./common/StyleInput"
import StyleButton from "./common/StyleButton"
const RegCom = ({ error, loading, onChange, onSubmit,username, password, role}) => {

    return (<>

        <ProductTitle>회 원 가 입</ProductTitle>
        <StyleForm onSubmit={onSubmit} width="30%" >
            <StyleInput name="username" value={username} onChange={onChange} 
                                placeholder="input username"/>
            <StyleInput name="password" value={password} onChange={onChange} 
                                placeholder="input password"/>
            {/*
            <StyleInput name="role" value={role} onChange={onChange} 
                                placeholder="input role"/>
            */}
            
            <StyleInput type="file" name="file" onChange={onchange} />
            
            <StyleButton>회원 가입</StyleButton>
            { loading 
                ? <div>회원가입 중 . . .</div>
                : error ? <div>{error}</div> : <></>
            }
            
        </StyleForm>
        
    </>)    
}
export default RegCom;