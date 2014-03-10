class LoginController < ApplicationController
	def index
	end
	#nueva definicion:
	def conexiones
		# json con la lista de conexiones:
		render :json => [{ :name => "test", :connectionString => "NA"},{ :name => "production", :connectionString => "NA"},{ :name => "development", :connectionString => "NA"}]		
	end
	def seleccionarConexion
		# en esa definicion se debe selecionar el ambiente (Base de datos de prueba, desarrollo o productivo).
		render :json => { :success => true }
	end
	
end
