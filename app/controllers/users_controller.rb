class UsersController < ApplicationController
    def create #signup customer user
        user_params.is_admin = false;
        user_params.is_owner = false;
        user=User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end

    end
    def show 
        if current_user
            render json: current_user
        else
            render json: { error: "not authorized" }, status: :unauthorized
        end
    end
    private
    def user_params
        params.permit(:name, :password, :password_confirmation)
    end
end
