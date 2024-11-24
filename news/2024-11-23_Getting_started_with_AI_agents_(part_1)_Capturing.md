---
title: "Getting started with AI agents (part 1): Capturing processes, roles and connections"
source: VentureBeat AI
date: 2024-11-23
link: https://venturebeat.com/ai/getting-started-with-ai-agents-part-1-capturing-processes-roles-and-connections/
---

Join our daily and weekly newsletters for the latest updates and exclusive content on industry-leading AI coverage. Learn More

A modern-day AI agent consists of, at least, a large language model (LLM) that has been enabled to call some tools. Given the right set of tools for coding, it would start by generating the code, be able to run it in a container, observe the results, modify the code and therefore have a better chance of producing useful code.

By contrast, a generative AI model takes some input and, through the process of predicting expectations, produces an output. For example, we give it a coding task, it produces some code, and, depending on the complexity of the task, the code may be usable as is.

As they take on different tasks, agents should be allowed to talk to each other. For example, imagine your company intranet with its useful search box directing you to the apps and resources you need. If you are a large enough company, these apps owned by different departments each have their own search boxes. It makes a lot of sense to create agents, maybe by using techniques like retrieval augmented generation (RAG), to augment the search boxes. What does not make sense is to force the user to repeat their query once the search box has identified it as useful given the initial query. Rather, we would prefer the top agent to coordinate with other agents representing various apps and present a consolidated and unified chat interface to you, the user.

A multi-agent system representing software or an organization’s various workflows can have several interesting advantages, including improved productivity and robustness, operational resilience and the ability ability to perform faster upgrades of different modules. Hopefully, this article will help you see how this is achieved.

But first, how should we go about building these multi-agent systems?

Capturing the organization and roles

First we should capture the processes, roles, responsible nodes and connections of various actors in the organization. By actors, I mean individuals and/or software apps that act as knowledge workers within the organization.

An organizational chart might be a good place to start, but I would suggest starting with workflows, as the same people within an organization tend to act with different processes and people depending on workflows.

There are available tools that use AI to help identify workflows, or you can build your own gen AI model. I’ve built one as a GPT which takes the description of a domain or a company name and produces an agent network definition. Because I’m utilizing a multi-agent framework built in-house at my company, the GPT produces the network as a Hocon file, but it should be clear from the generated files what the roles and responsibilities of each agent are and what other agents it is connected to.

Note that we want to make sure that the agent network is a directed acyclic graph (DAG). This means that no agent can simultaneously become down-chain and up-chain to any other agent, whether directly or indirectly. This greatly reduces the chances that queries in the agent network fall into a tailspin.

In the examples outlined here, all agents are LLM-based. If a node in the multi-agent organization can have zero autonomy, then that agent paired with its human counterpart, should run everything by the human. We will need all processing nodes, be they apps, humans or existing agents, to be represented as agents.

Lately there have been many announcements by companies offering specialized agents. We would, of course, want to make use of such agents, if available. We can pull in a preexisting agent and wrap its API into one of our agents so we can make use of our inter-agent communication protocols. This means that such third-party agents will need to have their API available for us to use.

How to define agents

Various agent architectures have been proposed in the past. For instance, a blackboard architecture requires a centralized point of communication where various agents declare their roles and capabilities, and the blackboard calls them depending on how it plans to fulfill a request (see OAA).

I prefer a more distributed architecture that respects the encapsulation of responsibilities. Each agent, having received a request, decides whether it can process it or not, and what it requires to do to process the request, then returns its list of requirements to its requesting up-chain agent. If the agent has down-chains, it asks them if they can help fulfill all or part of the request. If it receives any requirements from the contacted down-chains, it checks with other agents to see if they can fulfill them; if not, it sends them up-chain so that they can ask the human user. This architecture is called the AAOSA architecture and — fun fact — was the architecture used in early versions of Siri.

Here is a sample system prompt that can be used to turn an agent into an AAOSA agent.

When you receive an inquiry, you will:

Call your tools to determine which down-chain agents in your tools are responsible for all or part of it Ask down-chain agents what they need to handle their part of the inquiry. Once requirements are gathered, you will delegate the inquiry and the fulfilled requirements to the appropriate down-chain agents. Once all down-chain agents respond, you will compile their responses and return the final response. You may, in turn, be called by other agents in the system and have to act as a down-chain to them.

In addition to the set of roles and responsibilities defined in natural language in each agent’s system prompt, agents may or may not include tools that they can call, with various arguments being passed to the tools. For instance, a product manager agent may need to be able to process various tickets on a virtual Kanban board, or an alerts agent may need to call a tool to issue alerts in an alerting system.

Current multi-agent systems such as Microsoft AutoGen have elaborate and often hardcoded agent coordination mechanisms and architectures. I prefer a more robust setup where agents treat their immediate down-chain agents as tools, with loosely defined arguments that can be typed, and the semantics decided by the agents at the time of need.

In this setup, a down-chain agent can be defined as a function call:

“aaosa_call”: {

“description”: “Depending on the mode, returns a natural language string in response.”,

“parameters”: {

“type”: “object”,

“properties”: {

“inquiry”: {

“type”: “string”,

“description”: “The inquiry”

},

“mode”: {

“type”: “string”,

“description”: “””

indicates whether the agent is being asked to determine if the inquiry belongs to it

in its entirety or in part. or if it is being asked to provide requirements to fulfill

the inquiry, if any. or if it is being asked to respond to the inquiry.

“””

},

},

“required”: [

“inquiry”,

“mode”

]

}

}

AI agents in practice

An agent network for a company’s intranet.

Let’s explore an HR agent scenario. A user might inform the main search box agent of a life-changing event, such as “my significant other passed away,” trigger legal and HR agents that have a role to play in serving the user. This is because they, in turn, received information from some of their down-chain agents, namely legal advice, payroll and benefits agents. The resulting consolidated response that the user receives from the main search box agent will look like this:

HR aspects: The benefits agent can the user help understand how the passing might impact benefits, health insurance, and retirement plans. You’ll need to provide information about the types of plans involved and whether your significant other was a dependent.

The payroll agent can help manage tasks such as updating tax deductions or handling bereavement leave pay. This requires information about company policies on bereavement leave and current payroll setup. Legal aspects: Legal agents can offer general guidance as to how this passing should it relate to company affairs.

Each department requires specific information to offer tailored support.

An agent network for a telco with a B2B business.

In an IT scenario, meanwhile, the single-entry point is the customer support rep agent that can handle complex multi-faceted requests such as: “Our network is slow. I think it is overloaded since we recently added personnel to our office. I will also need a quote for an upgrade.”

An example response will outline the steps:

Network performance assessment: The network ops center specialist can help address the slowness and potential overload issues. They need access to network performance data, details about the current network infrastructure, information about the number of personnel added and their network usage patterns.

An upgraded quote: The sales engineer and field technician can help provide a quote for an upgrade. To do this they need:

Specific information about the current network setup, including equipment and bandwidth requirements.

Desired performance improvements.

Budgetary constraints and any specific preferences or requirements.

The scale of the upgrade and any specific performance goals.

I hope this gave you a good idea of what is required to set up a multi-agent network. In the second installment, I will discuss the importance of implementing safeguards when creating multi-agent systems and outline how to build in controls to allow for human intervention and uncertainty checks. I will also detail required steps to create a safe-guard agent to oversee the agent network and dive deeper into challenges of developing multi-agent networks — such as tailspins and overloads — and how to mitigate them using timeouts, task division and redundancy.

Babak Hodjat is CTO for AI at Cognizant.
