<template>
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <button
            class="absolute top-3 right-3 text-slate-500 hover:text slate-700"
            @click="$emit('close')"
            >
            X
            </button>
            <slot />
        </div>
    </div>
</template>