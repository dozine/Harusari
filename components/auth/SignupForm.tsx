"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const signupUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await axios.post("/api/auth/signup", {
    email,
    password,
    name,
  });
  return response.data;
};

const validateSignupForm = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string
) => {
  const errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
  } = {};

  if (!name.trim()) {
    errors.name = "이름을 입력해주세요.";
  } else if (name.trim().length < 2) {
    errors.name = "이름은 최소 2자 이상이어야 합니다.";
  }

  if (!email.trim()) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!password.trim()) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    errors.password = "비밀번호는 영문과 숫자를 포함해야 합니다.";
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  return errors;
};

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("회원가입 성공", data);
      setErrors({});
      alert("회워가입이 완료되었습니다. 로그인 페이지로 이동합니다.");

      router.push("/login");
    },
    onError: (error: any) => {
      console.error("회원가입 실패:", error);
      let errorMessage = "회원가입에 실패했습니다.";

      if (error.response?.status === 409) {
        errorMessage = "이미 사용중인 이메일입니다.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));
      alert(errorMessage);
    },
  });

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    const validationErrors = validateSignupForm(
      email,
      password,
      confirmPassword,
      name
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...validationErrors, general: undefined });
      return;
    }
    setErrors({});
    signupMutation.mutate({
      email: email.trim(),
      password,
      name: name.trim(),
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
        <p className="mt-2 text-sm text-gray-600">
          이미 계정이 있으신가요?
          <Link
            href="/login"
            className="text-sky-600 hover:text-sky-500 font-medium"
          >
            로그인하기
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            id="name"
            label="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange("name")}
            error={!!errors.name}
            disabled={signupMutation.isPending}
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div>
          <Input
            id="email"
            label="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange("email")}
            error={!!errors.email}
            disabled={signupMutation.isPending}
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div>
          <Input
            id="password"
            label="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange("password")}
            error={!!errors.password}
            errorMessage={errors.name}
            disabled={signupMutation.isPending}
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div>
          <Input
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            error={!!errors.confirmPassword}
            errorMessage={errors.name}
            disabled={signupMutation.isPending}
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </div>
        <div>
          <Button type="submit" disabled={signupMutation.isPending} fullWidth>
            {signupMutation.isPending ? "회원가입 중..." : "회원가입"}
          </Button>
        </div>
      </form>
    </div>
  );
}
