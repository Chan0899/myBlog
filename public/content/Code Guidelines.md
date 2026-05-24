# Code Guidelines

### 英文模板
1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

### 中文模板
1. 先思考，再编码
不要想当然。不要掩盖困惑。要呈现权衡取舍。

在实现之前：
- 明确陈述你的假设。如果存在不确定性，请提问。
- 如果存在多种解释，请全部列出——不要默默选择其中一种。
- 如果有更简单的方案，请说出来。在有充分理由时，可以拒绝不合理的要求。
- 如果某件事不清楚，停下来。指出哪里让人困惑。提问。

2. 简单至上
用最少的代码解决问题，不写任何臆想的功能。

- 不要超出需求范围的功能。
- 不要为仅使用一次的代码创建抽象。
- 不要添加未被要求的“灵活性”或“可配置性”。
- 不要为不可能发生的场景编写错误处理。
- 如果你写了 200 行代码而本来可以只用 50 行，请重写它。
- 问自己：“一位高级工程师会觉得这过于复杂吗？”如果答案是肯定的，那就简化。

3. 外科手术式改动
只动你必须动的部分。只清理你自己造成的混乱。

在修改现有代码时：
- 不要“改进”相邻的代码、注释或格式。
- 不要重构那些没有坏的东西。
- 保持与现有风格一致，即使你自己会采用不同的做法。
- 如果你发现了无关的废弃代码，可以提出来——但不要删除它。

当你的改动导致孤立代码时：
- 移除那些因**你的改动**而变得未使用的导入/变量/函数。
- 除非被要求，否则不要移除原本就存在的废弃代码。

检验标准：改动的每一行都应当直接追溯到用户的需求。

4. 目标驱动执行
定义成功的标准，循环执行直到验证通过。

将任务转化为可验证的目标：
- “添加校验” → “编写针对无效输入的测试，然后让测试通过”
- “修复那个 bug” → “编写一个能复现 bug 的测试，然后让测试通过”
- “重构 X” → “确保重构前后的测试都通过”

对于多步骤任务，陈述一个简短的计划：
1. [步骤] → 验证：[检查项]
2. [步骤] → 验证：[检查项]
3. [步骤] → 验证：[检查项]

强有力的成功标准可以让你独立地迭代。而弱标准（如“把它搞定”）则需要不断澄清。

### 参考来源
https://github.com/multica-ai/andrej-karpathy-skills