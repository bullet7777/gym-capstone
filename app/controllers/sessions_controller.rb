class SessionsController < ApplicationController
    def create #login
        user = User.find_by(name: params[:name]) 
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { error: "Invalid name or password" }, status: :unauthorized

        end
    end

    def destroy #logout
        session.delete :user_id
        head :no_content 
    end
  
end
