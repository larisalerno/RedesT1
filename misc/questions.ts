import { Question } from "../shared/interfaces/question.interface";

const easyQuestions: Question[] = [
    {
        description : "O tráfego em ambas direções, mas não simultanêamente, é característica de qual tipo de transmissão?",
        alternatives : [
            '1) Half-Duplex',
            '2) Simplex',
            '3) Ponto-a-ponto',
            '4) Full-Duplex'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "Qual é o comando usado para ver se uma máquina acessa a outra?",
        alternatives : [
            '1) trace route',
            '2) ipconfig',
            '3) ping',
            '4) exec'
        ],
        correctAnwserIndex: 3
    },

    {
        description : "Em quantas camadas se divide o modelo de referência OSI?",
        alternatives : [
            '1) 5',
            '2) 8',
            '3) 3',
            '4) 7'
        ],
        correctAnwserIndex: 4
    },

    {
        description : "Quais são os protocolos mais importantes da camada de Transporte?",
        alternatives : [
            '1) TCP e UDP',
            '2) HTTP e SMTP',
            '3) UDP e SMTP',
            '4) TCP e HTTP'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "A qual camada pertence o protocolo IP?",
        alternatives : [
            '1) Aplicação',
            '2) Rede',
            '3) Transporte',
            '4) Enlace'
        ],
        correctAnwserIndex: 2
    }
]

const mediumQuestions: Question[] = [
    {
        description : "Em qual protocolo o campo de Checksum é opcional?",
        alternatives : [
            '1) TCP',
            '2) HTTP',
            '3) IP',
            '4) UDP'
        ],
        correctAnwserIndex: 4
    },

    {
        description : "Quantas camadas tem o modelo padrão TCP/IP?",
        alternatives : [
            '1) 5',
            '2) 2',
            '3) 4',
            '4) 3'
        ],
        correctAnwserIndex: 3
    },

    {
        description : "Qual o significado do comando NOOP do SMTP?",
        alternatives : [
            '1) Envia o conteúdo da mensagem',
            '2) Identifica o destinatário da mensagem',
            '3) Verifica o endereço de e-mail de um servidor',
            '4) O servidor responde com OK reply code'
        ],
        correctAnwserIndex: 4
    },

    {
        description : "Não é um estado do POP:",
        alternatives : [
            '1) Identificação',
            '2) Autorização',
            '3) Transação',
            '4) Atualização'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "A conectividade traz problemas de segurança, que podem ser minimizados com ____?",
        alternatives : [
            '1) POP',
            '2) NAT',
            '3) DHCP',
            '4) ISMT'
        ],
        correctAnwserIndex: 2
    }
]

const hardQuestions: Question[] = [
    {
        description : "No DNS é errado afirmar que:",
        alternatives : [
            '1) Não existe nenhum repositório central que contenha informações sobretodos os computadores ligados à Internet.',
            '2) É composto de um banco de dados de serviços.',
            '3) Para cada domĩnio têm-se um arquivo de zona',
            '4) Servidores tem “autoridade” para o domínio.'
        ],
        correctAnwserIndex: 2
    },

    {
        description : "Qual dos itens abaixo não é uma métrica de roteamento?",
        alternatives : [
            '1) Path length',
            '2) Load',
            '3) Bandweight',
            '4) Reability'
        ],
        correctAnwserIndex: 3
    },

    {
        description : "Qual dos itens abaixo não faz parte do cabeçalho do pacote ICMP?",
        alternatives : [
            '1) Timestamp',
            '2) Type',
            '3) Checksum',
            '4) Code'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "No cabeçalho do protocolo IPv6:",
        alternatives : [
            '1) O Next Header identifica o cabeçalho de expansão que segue o atual',
            '2) O Flow Label identifica pacotes do mesmo fluxo de comunicação',
            '3) O Priority indica a prioridade de cada datagrama',
            '4) O Payload Length indica o tamanho, em Bytes, apenas dos dados enviados junto ao cabeçalho IPv6.'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "Qual dos itens abaixo é um elemento de serviço do nível de aplicação?",
        alternatives : [
            '1) RISE',
            '2) ACSI',
            '3) RTSE',
            '4) CSTM'
        ],
        correctAnwserIndex: 3
    }
]

export{easyQuestions};
export{mediumQuestions};
export{hardQuestions};
