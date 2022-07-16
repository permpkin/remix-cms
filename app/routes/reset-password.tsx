import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigate, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { getUserId } from "~/session.server";

import { getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils";
import { CountDown } from "~/components/CountDown";
import { BrandLogo } from "~/components/BrandLogo";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
  };
  success?: boolean
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  return json<ActionData>(
    { success: true },
    { status: 200 }
  );
};

export const meta: MetaFunction = () => {
  return {
    title: "Reset Password",
  };
};

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);

  let navigate = useNavigate();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    }
  }, [actionData]);

  const doRedirect = () => {
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrandLogo/>
        {actionData?.success === true ? (
          
          <div className="flex items-center justify-center flex-col">
            <h1>Password Reset</h1>
            <div className="text-center text-sm text-gray-500">
              If that email exists, you'll receive password reset instructions.
            </div>
            <div className="text-center text-sm text-gray-500">
              <CountDown from={5} callback={doRedirect}/>
            </div>
          </div>

        ):(

          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  required
                  autoFocus={true}
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {actionData?.errors?.email && (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  className="text-blue-500 underline"
                  to={{
                    pathname: "/login",
                    search: searchParams.toString(),
                  }}
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>

        )}
      </div>
    </div>
  );
}
