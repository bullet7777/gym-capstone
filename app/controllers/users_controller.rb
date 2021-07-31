class UsersController < ApplicationController
    def create #signup customer user
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
    def packages
        packages=current_user.packages
        render json: packages 
    end
    private
    def user_params
        params.permit(:name, :password, :password_confirmation)
    end
end
