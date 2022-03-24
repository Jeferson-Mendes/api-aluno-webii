# api-aluno-webii
API with simple crud and deploy heroku for one college discipline


### Understand this:

##### For protected routes, Bearer token:

> 'Bearer {token}'

| Verbo | Endereço			 	| Descrição 							| O que passar | Protegida? |
|-		|	   	  			-	|	-   								| - 		   | -     |
|**GET**	|`Base_url`/alunos 	|Lista os alunos cadastrados 		 	|			   | false |
|**GET**	|`Base_url`/alunos/:id 	|Detalhes de um aluno| `parameter:` Id do aluno | false |
|**PUT**	|`Base_url`/alunos/atualizar/:id | Atualizar informações de um aluno | `parameter:` Id do aluno; `body:` {nome: 'string', curso: 'string',semestre: int}		   | true |
|**DELETE** | `Base_url`/alunos/excluir/:id | Remover um aluno da base de dados | `parameter:` Id do aluno | true |
|**POST**	|`Base_url`/alunos | Registrar um aluno |`body:` {nome: 'string', curso: 'string',semestre: int, email: 'string', senha: 'string'}		   | true |
|**POST**	|`Base_url`/alunos/login | Autenticar na api |`body:` {email: 'string', senha: 'string'}		   | false |
