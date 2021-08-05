class PackagesController < ApplicationController
    def index
        packages=Package.all
        render json: packages, include: :users
    end
    def show 
       package=Package.find_by(id: params[:id])
        if package
        render json: package
        else 
            render json: { errors:["Not found" ]},status: :not_found
        end
    end

    def create
         package=Package.create({name: package_params[:name],price: package_params[:price],class_limit: package_params[:class_limit]})
        if package.valid?
            render json: package, status: :created
        else
            render json: { errors: package.errors.full_messages }, status: :unprocessable_entity
        end
   
end

def update
    package=Package.find_by(id: params[:id])
    if package 
        cm= package.update({name: package_params[:name],price: package_params[:price],class_limit: package_params[:class_limit]})
        if cm ===false
            render json: { errors:["Failed to update check parameters" ]},status: :unprocessable_entity
        else
        render json: package
        end
    else 
        render json: { errors:[" Package Not found"] },status: :not_found
    end
end

def destroy
    package=Package.find_by(id: params[:id])
    if package
        if package.users.length != 0
            render json: { errors:["Cannot delete a package which is used"] },status: :unprocessable_entity
        else
        package.destroy
        head :no_content
        end
    else 
            render json: { errors:["Not found" ]},status: :not_found
end
   
end

private
def package_params
    params.permit(:name, :price, :class_limit, :start_date,:end_date)
end

end
