# FisioCheck

Aplicação web para avaliação fisioterapêutica, desenvolvida com React e TypeScript.

---

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

---

## Tecnologias

- React 19 + TypeScript
- Create React App
- Ant Design 6
- React Router DOM 7
- Axios
- MockAPI (backend simulado)

---

## Configuração do MockAPI

O projeto usa o [MockAPI](https://mockapi.io/) como backend. É necessário criar o seu próprio projeto lá.

1. Crie uma conta em [mockapi.io](https://mockapi.io/)
2. Crie um novo projeto
3. Crie o recurso `evaluations` com o schema abaixo:

| Campo               | Tipo      |
| ------------------- | --------- |
| `id`                | Object ID |
| `evaluationDate`    | String    |
| `patientName`       | String    |
| `physiotherapist`   | String    |
| `mainComplaint`     | String    |
| `clinicalDiagnosis` | String    |
| `affectedRegion`    | String    |
| `painScale`         | Number    |
| `treatmentPlan`     | String    |
| `status`            | String    |

4. Apague os registros gerados automaticamente e importe o JSON de dados iniciais abaixo
5. Copie a URL base gerada — formato: `https://<SEU_ID>.mockapi.io/api`

## Dados iniciais (JSON) para popular

[
{
"evaluationDate": "2026-02-16",
"patientName": "João Santos",
"physiotherapist": "Dra. Ana Lima",
"mainComplaint": "Dor lombar ao ficar sentado por muito tempo",
"clinicalDiagnosis": "Lombalgia crônica",
"affectedRegion": "Coluna lombar",
"painScale": 5,
"treatmentPlan": "Alongamento, fortalecimento de core, RPG",
"status": "Em andamento",
"id": "2"
},
{
"evaluationDate": "2026-02-16",
"patientName": "Ana Oliveira",
"physiotherapist": "Dr. Carlos Souza",
"mainComplaint": "Limitação de movimento no ombro esquerdo",
"clinicalDiagnosis": "Tendinite do supraespinhal",
"affectedRegion": "Ombro esquerdo",
"painScale": 6,
"treatmentPlan": "Mobilização articular, ultrassom, exercícios pendulares",
"status": "Em andamento",
"id": "3"
},
{
"evaluationDate": "2026-02-15",
"patientName": "Pedro Costa",
"physiotherapist": "Dra. Ana Lima",
"mainComplaint": "Dor no tornozelo após entorse",
"clinicalDiagnosis": "Entorse de tornozelo grau II",
"affectedRegion": "Tornozelo direito",
"painScale": 4,
"treatmentPlan": "Propriocepção, fortalecimento de fibulares, crioterapia",
"status": "Concluído",
"id": "4"
},
{
"evaluationDate": "2026-02-16",
"patientName": "Lucia Ferreira",
"physiotherapist": "Dra. Ana Lima",
"mainComplaint": "Dificuldade para respirar após COVID-19",
"clinicalDiagnosis": "Síndrome pós-COVID respiratória",
"affectedRegion": "Sistema respiratório",
"painScale": 3,
"treatmentPlan": "Fisioterapia respiratória, exercícios de expansão pulmonar",
"status": "Em andamento",
"id": "5"
},
{
"evaluationDate": "2026-02-14",
"patientName": "Mariana Ribeiro",
"physiotherapist": "Dr. Carlos Souza",
"mainComplaint": "Dor no joelho ao subir escadas",
"clinicalDiagnosis": "Condromalácia patelar",
"affectedRegion": "Joelho direito",
"painScale": 6,
"treatmentPlan": "Fortalecimento de quadríceps, alongamento, treino funcional",
"status": "Em andamento",
"id": "6"
},
{
"evaluationDate": "2026-02-13",
"patientName": "Rafael Almeida",
"physiotherapist": "Dra. Ana Lima",
"mainComplaint": "Dor no punho após esforço repetitivo no trabalho",
"clinicalDiagnosis": "Síndrome do túnel do carpo",
"affectedRegion": "Punho direito",
"painScale": 7,
"treatmentPlan": "Exercícios de mobilidade, orientação ergonômica, terapia manual",
"status": "Em andamento",
"id": "7"
},
{
"evaluationDate": "2026-02-12",
"patientName": "Camila Nunes",
"physiotherapist": "Dra. Paula Martins",
"mainComplaint": "Dor no pescoço e rigidez ao acordar",
"clinicalDiagnosis": "Cervicalgia",
"affectedRegion": "Coluna cervical",
"painScale": 5,
"treatmentPlan": "Alongamentos cervicais, liberação miofascial, reeducação postural",
"status": "Concluído",
"id": "8"
},
{
"evaluationDate": "2026-02-11",
"patientName": "Bruno Henrique",
"physiotherapist": "Dr. Felipe Rocha",
"mainComplaint": "Dor no ombro ao levantar o braço acima da cabeça",
"clinicalDiagnosis": "Síndrome do impacto do ombro",
"affectedRegion": "Ombro direito",
"painScale": 6,
"treatmentPlan": "Fortalecimento de manguito rotador, mobilização, gelo",
"status": "Em andamento",
"id": "9"
},
{
"evaluationDate": "2026-02-10",
"patientName": "Fernanda Dias",
"physiotherapist": "Dra. Paula Martins",
"mainComplaint": "Dor no quadril ao caminhar por longas distâncias",
"clinicalDiagnosis": "Bursite trocantérica",
"affectedRegion": "Quadril esquerdo",
"painScale": 4,
"treatmentPlan": "Alongamento de glúteos, fortalecimento, terapia manual",
"status": "Concluído",
"id": "10"
},
{
"evaluationDate": "2026-02-09",
"patientName": "Gustavo Pereira",
"physiotherapist": "Dr. Carlos Souza",
"mainComplaint": "Dor no calcanhar ao pisar pela manhã",
"clinicalDiagnosis": "Fascite plantar",
"affectedRegion": "Pé esquerdo",
"painScale": 7,
"treatmentPlan": "Alongamento de fáscia plantar, liberação, uso de palmilha",
"status": "Em andamento",
"id": "11"
},
{
"evaluationDate": "2026-02-08",
"patientName": "Juliana Castro",
"physiotherapist": "Dra. Ana Lima",
"mainComplaint": "Dor e fraqueza na mão após fratura antiga",
"clinicalDiagnosis": "Rigidez pós-fratura de rádio distal",
"affectedRegion": "Punho esquerdo",
"painScale": 3,
"treatmentPlan": "Mobilização, fortalecimento progressivo, treino funcional",
"status": "Cancelado",
"id": "12"
},
{
"evaluationDate": "2026-02-07",
"patientName": "Diego Moreira",
"physiotherapist": "Dr. Felipe Rocha",
"mainComplaint": "Dor na coxa posterior ao correr",
"clinicalDiagnosis": "Distensão de isquiotibiais",
"affectedRegion": "Coxa direita",
"painScale": 6,
"treatmentPlan": "Controle de carga, fortalecimento excêntrico, alongamento",
"status": "Em andamento",
"id": "13"
},
{
"evaluationDate": "2026-02-06",
"patientName": "Patrícia Souza",
"physiotherapist": "Dra. Paula Martins",
"mainComplaint": "Dor no cotovelo ao segurar objetos",
"clinicalDiagnosis": "Epicondilite lateral (cotovelo de tenista)",
"affectedRegion": "Cotovelo direito",
"painScale": 5,
"treatmentPlan": "Exercícios excêntricos, liberação miofascial, gelo",
"status": "Concluído",
"id": "14"
},
{
"evaluationDate": "2026-02-05",
"patientName": "Renata Lima",
"physiotherapist": "Dr. Carlos Souza",
"mainComplaint": "Dor no joelho após corrida e instabilidade leve",
"clinicalDiagnosis": "Lesão leve de ligamento colateral medial",
"affectedRegion": "Joelho esquerdo",
"painScale": 4,
"treatmentPlan": "Fortalecimento, propriocepção, controle de impacto",
"status": "Em andamento",
"id": "15"
}
]

---

## Instalação

````bash
git clone https://github.com/seu-usuario/fisiocheck.git
cd fisiocheck
npm install -f


Crie o arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=https://<SEU_ID>.mockapi.io/api
````

> No Create React App, variáveis de ambiente devem começar com `REACT_APP_`.

---

## Execução

```bash
npm start
```

Acesse em http://localhost:3000

---

## Scripts

| Comando         | Descrição                   |
| --------------- | --------------------------- |
| `npm start`     | Servidor de desenvolvimento |
| `npm run build` | Build de produção           |
| `npm test`      | Executa os testes           |
