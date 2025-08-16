"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/auth/login", { email, password });
  return response.data;
};

const validateForm = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};
  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "유효한 이메일 형식이 아닙니다.";
  }

  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  return errors;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      console.log("로그인 성공", data);
      setErrors({});
      login(data.user);

      alert("로그인 성공!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("로그인 실패", error);
      const errorMessage =
        error.response?.data?.message || "로그인에 실패했습니다.";
      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));
      alert(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...validationErrors, general: undefined });
      return;
    }
    setErrors({});
    loginMutation.mutate({ email, password });
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1
        className="font-bold text-4xl tracking-wider bg-clip-text text-transparent
    bg-gradient-to-r from-orange-400 to-rose-600 mb-4"
      >
        Harusari
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          errorMessage={errors.email}
          disabled={loginMutation.isPending}
          placeholder="이메일을 입력해주세요"
        />

        <Input
          id="password"
          label="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          errorMessage={errors.password}
          disabled={loginMutation.isPending}
          placeholder="비밀번호를 입력해주세요"
        />

        {errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800 text-center">{errors.general}</p>
          </div>
        )}
        <div>
          <Button disabled={loginMutation.isPending} fullWidth type="submit">
            {loginMutation.isPending ? "로그인 중 ..." : "로그인"}
          </Button>
        </div>
        <div className="flex justify-between mx-4">
          <Link
            href="/"
            className="text-sm text-gray-900 hover:text-orange-500"
          >
            비번 찾기
          </Link>
          <Link
            href="/signup"
            className="text-sm text-gray-900 hover:text-orange-500"
          >
            회원 가입
          </Link>
        </div>
      </form>
    </div>
  );
}
