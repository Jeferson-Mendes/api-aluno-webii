# api-aluno-webii
API with simple crud and deploy heroku for one college discipline


### Understand this:

##### For protected routes, Bearer token:

> 'Bearer {token}'

##### ALUNOS

| Verbo | Endereço			 	| Descrição 							| O que passar | Protegida? |
|-		|	   	  			-	|	-   								| - 		   | -     |
|**GET**	|`Base_url`/alunos 	|Lista os alunos cadastrados 		 	|			   | false |
|**GET**	|`Base_url`/alunos/:id 	|Detalhes de um aluno| `parameter:` Id do aluno | false |
|**PUT**	|`Base_url`/alunos/atualizar/:id | Atualizar informações de um aluno | `parameter:` Id do aluno; `body:` {nome: 'string', curso: 'string',semestre: int}		   | true |
|**DELETE** | `Base_url`/alunos/excluir/:id | Remover um aluno da base de dados | `parameter:` Id do aluno | true |
|**POST**	|`Base_url`/alunos | Registrar um aluno |`body:` {nome: 'string', curso: 'string',semestre: int, email: 'string', senha: 'string'}		   | false |
|**POST**	|`Base_url`/alunos/login | Autenticar na api |`body:` {email: 'string', senha: 'string'}		   | false |

##### ENCONTROS


| Verbo | Endereço			 	| Descrição 							| O que passar | Protegida? |
|-		|	   	  			-	|	-   								| - 		   | -     |
|**GET**	|`Base_url`/encontros 	|Lista os encontros cadastrados 		 	|			   | false |
|**GET**	|`Base_url`/encontros/:id 	|Detalhes de um encontro| `parameter:` Id do encontro | false |
|**PUT**	|`Base_url`/encontros/atualizar/:id | Atualizar informações de um encontro | `parameter:` Id do encontro; `body:` {assunto_id: int, data: 'string'}		   | true |
|**DELETE** | `Base_url`/encontros/excluir/:id | Remover um encontro da base de dados | `parameter:` Id do encontro | true |
|**POST**	|`Base_url`/encontros | Registrar um encontro |`body:` {assunto_id: int, data: 'string'}		   | true |
|**POST**	|`Base_url`/encontros/add/aluno | Adicionar aluno a encontro |`body:` {aluno_id: int, encontro_id: int}		   | true |

##### ASSUNTOS


| Verbo | Endereço			 	| Descrição 							| O que passar | Protegida? |
|-		|	   	  			-	|	-   								| - 		   | -     |
|**GET**	|`Base_url`/assuntos 	|Lista os assuntos cadastrados 		 	|			   | false |
|**GET**	|`Base_url`/assuntos/:id 	|Detalhes de um assunto| `parameter:` Id do assunto | false |
|**PUT**	|`Base_url`/assuntos/atualizar/:id | Atualizar informações de um assunto | `parameter:` Id do assunto; `body:` {nome: 'string', grau_dificuldade: int, tempo_necessario: int }		   | true |
|**DELETE** | `Base_url`/assunto/excluir/:id | Remover um assunto da base de dados | `parameter:` Id do assunto | true |
|**POST**	|`Base_url`/assuntos | Registrar um assunto |`body:` {nome: 'string', grau_dificuldade: int, tempo_necessario: int}		   | true |
