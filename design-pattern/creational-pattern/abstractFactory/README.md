# Abstract Factory Design Pattern

The **Abstract Factory Pattern** is a **creational design pattern** that provides an interface for creating families of related or dependent objects without specifying their concrete classes.

---

## 1. The Core Problem It Solves

When building cross-platform or multi-theme applications, your code often needs to instantiate related UI elements (e.g., Buttons, Checkboxes, TextBoxes for Windows vs. macOS).

Without a structured pattern, two major architectural problems arise:

### Problem 1: Tight Coupling

If your client code directly instantiates platform-specific classes using conditional checks (`if platform == "window"`), it becomes tightly coupled to those concrete classes. Any addition of a new platform (e.g., Linux) requires modifying client code across the entire codebase.

### Problem 2: Inconsistent Object Families (Mixing Mismatched UI)

Without enforcement, developers can accidentally mix components from different platforms:

```python
# Unintended mixing of platform components
button = WindowsButton()
checkbox = MacCheckbox()  # Inconsistent UI!

```

The Abstract Factory pattern ensures that **objects from the same family are always used together**.

---

## 2. Pattern Architecture

```
                       ┌──────────────────┐
                       │   GUIFactory     │ <--- Abstract Factory
                       ├──────────────────┤
                       │ create_button()  │
                       │ create_checkbox()│
                       └────────┬─────────┘
                                │
             ┌──────────────────┴──────────────────┐
             ▼                                     ▼
  ┌────────────────────┐                ┌────────────────────┐
  │   WindowsFactory   │                │     MacFactory     │ <--- Concrete Factories
  ├────────────────────┤                ├────────────────────┤
  │ create_button()    │─┐              │ create_button()    │─┐
  │ create_checkbox()  │ │              │ create_checkbox()  │ │
  └────────────────────┘ │              └────────────────────┘ │
                         │                                     │
                         ▼                                     ▼
            ┌────────────────────────┐            ┌────────────────────────┐
            │     WindowsButton      │            │       MacButton        │ <--- Concrete Products
            │    WindowsCheckbox     │            │      MacCheckbox       │
            └────────────────────────┘            └────────────────────────┘

```

---

## 3. Step-by-Step Implementation Blueprint

### Step 1: Define Abstract Products

Define common interfaces for all distinct product types in the family.

```python
from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def render(self) -> None:
        pass

class Checkbox(ABC):
    @abstractmethod
    def render(self) -> None:
        pass

```

### Step 2: Implement Concrete Products

Create platform-specific implementations of each abstract product.

```python
# Windows Variants
class WindowsButton(Button):
    def render(self) -> None:
        print("Rendering Windows-style Button")

class WindowsCheckbox(Checkbox):
    def render(self) -> None:
        print("Rendering Windows-style Checkbox")

# macOS Variants
class MacButton(Button):
    def render(self) -> None:
        print("Rendering macOS-style Button")

class MacCheckbox(Checkbox):
    def render(self) -> None:
        print("Rendering macOS-style Checkbox")

```

### Step 3: Define the Abstract Factory Interface

Declare creation methods for **every** abstract product in the family.

```python
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

```

### Step 4: Implement Concrete Factories

Implement the creation logic for each target platform family.

```python
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()

```

### Step 5: Write the Client Code

The client works **only** with the `GUIFactory`, `Button`, and `Checkbox` abstract interfaces. It remains completely unaware of concrete platform implementations.

```python
def render_ui(factory: GUIFactory) -> None:
    button = factory.create_button()
    checkbox = factory.create_checkbox()

    button.render()
    checkbox.render()

```

---

## 4. Complete Executable Code Example

```python
from abc import ABC, abstractmethod

# ==========================================
# 1. ABSTRACT PRODUCTS
# ==========================================

class Button(ABC):
    @abstractmethod
    def render(self) -> None:
        pass


class Checkbox(ABC):
    @abstractmethod
    def render(self) -> None:
        pass


# ==========================================
# 2. CONCRETE PRODUCTS
# ==========================================

class WindowsButton(Button):
    def render(self) -> None:
        print("[Windows] Button rendered.")


class WindowsCheckbox(Checkbox):
    def render(self) -> None:
        print("[Windows] Checkbox rendered.")


class MacButton(Button):
    def render(self) -> None:
        print("[macOS] Button rendered.")


class MacCheckbox(Checkbox):
    def render(self) -> None:
        print("[macOS] Checkbox rendered.")


# ==========================================
# 3. ABSTRACT FACTORY
# ==========================================

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass


# ==========================================
# 4. CONCRETE FACTORIES
# ==========================================

class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()


class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()


# ==========================================
# 5. CLIENT APPLICATION
# ==========================================

class Application:
    def __init__(self, factory: GUIFactory):
        self.button = factory.create_button()
        self.checkbox = factory.create_checkbox()

    def render(self) -> None:
        self.button.render()
        self.checkbox.render()


# ==========================================
# 6. RUNTIME BOOTSTRAPPER
# ==========================================

def get_factory(os_name: str) -> GUIFactory:
    factories = {
        "Windows": WindowsFactory,
        "macOS": MacFactory,
    }
    if os_name in factories:
        return factories[os_name]()
    raise ValueError(f"Unsupported Operating System: {os_name}")


if __name__ == "__main__":
    # Example 1: Windows Client
    current_os = "Windows"
    factory = get_factory(current_os)
    app = Application(factory)
    app.render()

    print("-" * 30)

    # Example 2: macOS Client
    current_os = "macOS"
    factory = get_factory(current_os)
    app = Application(factory)
    app.render()

```

---

## 5. Summary & Trade-offs

| Feature | Description |
| --- | --- |
| **Pattern Type** | Creational Pattern |
| **Primary Goal** | Create families of related objects without specifying concrete classes |
| **Key Advantage** | Guarantees compatibility between objects belonging to the same product family |
| **SOLID Principles** | **Single Responsibility:** Isolates object creation code.<br>

<br>**Open/Closed:** Easily introduce new product variants without breaking existing client code. |
| **Main Drawback** | Code can become overly complex with many interfaces/classes. Adding **new product types** (e.g., adding `TextBox` to every factory) requires modifying the abstract factory and all concrete factories. |

### Quick Comparison: Factory Method vs. Abstract Factory

* **Factory Method:** Focuses on creating **a single product** through inheritance (`create_button()`).
* **Abstract Factory:** Focuses on creating **families of related products** through composition (`create_button()`, `create_checkbox()`, `create_textbox()`).