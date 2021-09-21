import { UseFormRegisterReturn } from "react-hook-form";

type ValidationError = {
    isError: boolean
    msg: string
}

type TextInputProps = {
    id: string
    type: "email" | "text" | "password"
    label: string
    register: UseFormRegisterReturn // from react-hook-forms
    errors?: ValidationError[]
}

const TextInput: React.FC<TextInputProps> = ({
    id,
    type,
    label,
    register,
    errors
}) => {
    const errorMsg = errors?.reduce<string | undefined>(
        (err, curr) => {
            return err || (curr.isError ? curr.msg : undefined)
        },
        undefined,
    )

    return (
        <div className="block mx-5 mb-7 h-14">
            <div className={"bg-gray-200 rounded-xl " + (errorMsg ? "border border-red-700" : "")}>
                <label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor={id}>
                    {label}
                </label>
                <input
                    id={id}
                    type={type}
                    className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
                    {...register}
                />
            </div>
            {errorMsg && <span className="ml-1 text-xs font-medium text-red-700">{errorMsg}</span>}
        </div>
    )
}

export default TextInput;