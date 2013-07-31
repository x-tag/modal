## Overview

A modal is a UI component that pops up when specified, covering its parent element until it is dismissed.

## Usage

Default modal, initializing as visible and dismissable by clicking outside the modal:

	<x-modal>
		Place content markup here
	</x-modal>

Modal that darkens the parent element that it is covering when visible:

	<x-modal overlay>
		Place content markup here
	</x-modal>

Modal that initializes as hidden:

	<x-modal hidden>
		Place content markup here
	</x-modal>

Modal that allows pressing the ESC key to dismiss itself:

	<x-modal esc-hide>
		Place content markup here
	</x-modal>

Modal that prevents outer-clicks from dismissing itself:

	<x-modal cancel-click-hide>
		Place content markup here
	</x-modal>

# Methods

## ___hide___

Dismisses the modal popup.

## ___show___

Dismisses the modal popup.

## ___toggle___

Alternates the visibility status of the modal popups.

# Events

## ___modalhide___

When a `x-modal` element receives the `modalhide` event, it is dismissed (if it is currently visible).


# Create X-Tag Components

[Guide for creating X-Tag Components](https://github.com/x-tag/core/wiki/Creating-X-Tag-Components)

# Use X-Tag Components

[Using X-Tag components in your applications](https://github.com/x-tag/core/wiki/Using-X-Tag-Components-in-your-application)

