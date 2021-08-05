class UsersController < ApplicationController


    def index
        if current_user.is_owner
        users=User.where.not(id: current_user.id)
        else
            users=User.where(is_owner: false,is_admin: false)
        end
        render json: users, include: :packages
        
    end
    def create #signup customer user
       user=create_user(user_params)
       if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
    else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end

    end
    def show_loggedInUser 
        if current_user
            render json: current_user
        else
            render json: { errors: ["not authorized"] }, status: :unauthorized
        end
    end
    def show 
        user=User.find_by(id: params[:id])
        if user
            render json: user
        else
            render json: { errors: ["not found"] }, status: :not_found
        end
    end
    def packages
        packages=current_user.packages
        render json: packages 
    end
    def createUser
           user=create_user(user_params)
           if user.valid?
               render json: user, include: :packages, status: :created
           else
               render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
           end
       end

    def createAdmin
     if current_user.is_owner
        user_info=user_params
        user_info[:is_admin]=true
        user=create_user(user_info)
        if user.valid?
            render json: user,include: :packages, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
     else
        render json: { errors: ["not authorized" ]}, status: :unauthorized
     end

    end

    def update
        user=User.find_by(id: params[:id])
        if user 
            cm= user.update({name: user_params[:name],password: user_params[:password],password_confirmation:user_params[:password_confirmation]})
            if cm ===false
                render json: { errors:["Failed to update check parameters"] },status: :unprocessable_entity
            else
            render json: user
            end
        else 
            render json: { errors:[" User Not found" ]},status: :not_found
        end
    end

    def destroy
        user=User.find_by(id: params[:id])
        if user
            if user.packages.length != 0
                render json: { errors:[" User cannot be deleted because they bought packages"] },status: :unprocessable_entity
            else
            user.destroy
            head :no_content
            end
            else 
                render json: { errors:["Not found"] },status: :not_found
            end
    end
  


    private
    def user_params
        params.permit(:name, :password, :password_confirmation)
    end
    def create_user(user_info)
        user_info[:join_date]=DateTime.now
        user=User.create(user_info)
        
    end
end
